let display = {
  draw: () => {
    display.background.draw()
    display.stripes.draw()
    display.grid.draw()
    display.emptyCells.draw()
    display.shadows.draw()
    display.features.draw()
  },
  background: {
    canvas: document.getElementById("background").getContext("2d"),
    draw: () => {
      let c = display.background.canvas
      c.fillStyle = colors.background
      c.fillRect(0, 0, c.canvas.width, c.canvas.height)
    }
  },
  stripes: {
    canvas: document.getElementById("stripes").getContext("2d"),
    draw: () => {
      let c = display.stripes.canvas
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)
      c.translate(camera.x % cellSize, camera.y % cellSize)
      for(var x = 2; x < c.canvas.width/stripeDistance * 2; x++)
      {
        c.strokeStyle = colors.wall_stripes
        c.beginPath();
        c.moveTo(x * stripeDistance, -stripeDistance)
        c.lineTo(-stripeDistance,x * stripeDistance)
        c.stroke();
      }
      c.translate(-camera.x % cellSize, -camera.y % cellSize)
    }
  },
  grid: {
    canvas: document.getElementById("grid").getContext("2d"),
    draw: () => {
      let c = display.grid.canvas
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)
      c.translate(camera.x % cellSize, camera.y % cellSize)
      c.translate(0.5, 0.5) //to de-alias shit
      for(var x = -1; x < c.canvas.width/cellSize; x++)
      {
        for(var y = -1; y < c.canvas.height/cellSize; y++)
        {
          c.strokeStyle = colors.borders_grid
          c.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize)
        }
      }
      c.translate(-0.5, -0.5) //to de-alias shit
      c.translate(-camera.x % cellSize, -camera.y % cellSize)
    }
  },
  emptyCells: {
    canvas: document.getElementById("emptyCells").getContext("2d"),
    draw: () => {
      let c = display.emptyCells.canvas
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)

      let data = map.getMapAsList()

      c.translate(camera.x, camera.y)

      for(let i = 0; i < data.length; i++) {
        let obj = data[i]
        if(obj.type != "wall") continue
        c.translate(obj.x * cellSize, obj.y * cellSize)

        if(render_walls) {
          c.fillStyle = colors.borders_room
          c.fillRect(0, 0, cellSize+1, cellSize+1)

          c.fillStyle = colors.background
          if(map.get("wall", obj.x - 1, obj.y) != null) c.fillRect(0, 1, 1, cellSize-1)
          if(map.get("wall", obj.x, obj.y - 1) != null) c.fillRect(1, 0, cellSize - 1, 1)
          if(!render_corner_dots
            & map.get("wall", obj.x - 1, obj.y) != null
            & map.get("wall", obj.x, obj.y - 1) != null
            & map.get("wall", obj.x - 1, obj.y - 1) != null) {
            c.fillRect(0, 0, 1, 1)
          }
        }
        c.fillStyle = colors.background
        c.fillRect(1, 1, cellSize - 1, cellSize - 1)

        c.translate(-obj.x * cellSize, -obj.y * cellSize)
      }

      c.translate(-camera.x, -camera.y)
    }
  },
  shadows: {
    canvas: document.getElementById("shadows").getContext("2d"),
    draw: () => {
      let c = display.shadows.canvas
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)

      let data = map.getMapAsList()
      for(let i = 0; i < data.length; i++) {
        let obj = data[i]
        if(obj.type != "wall") continue
        c.translate(obj.x * cellSize, obj.y * cellSize)

        if(map.get("wall", obj.x, obj.y - 1) == null) {
          let x = 3
          let width = cellSize - 5

          if(map.get("wall", obj.x + 1, obj.y) == null)
          {
            width += 2
          }
          if(map.get("wall", obj.x + 1, obj.y) != null & map.get("wall", obj.x + 1, obj.y - 1) == null)
          {
            width += 5
          }
          if(map.get("wall", obj.x - 1, obj.y) == null)
          {
            x = 1
            width += 2
          }

          c.fillStyle = colors.shadow
          c.fillRect(x, 1, width, 3)
        }

        c.translate(-obj.x * cellSize, -obj.y * cellSize)
      }
    }
  },
  features: {
    canvas: document.getElementById("features").getContext("2d"),
    draw: () => {
      let c = display.features.canvas
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)

      let data = map.getMapAsList()

      c.translate(camera.x, camera.y)

      for(let i = 0; i < data.length; i++) {
        let obj = data[i]
        if(obj.type == "wall") continue

        let img = obj_ids[obj.type].cachedimage
        rotation = (obj.rotation*90) * Math.PI/180
        translateX = obj.x * cellSize
        translateY = obj.y * cellSize

        c.translate(translateX, translateY)
        c.rotate(rotation)
        c.drawImage(img, 0, 0, cellSize+1, cellSize+1)
        c.rotate(-rotation)
        c.translate(-translateX, -translateY)
      }

      c.translate(-camera.x, -camera.y)
    }
  },
  mouse: {
    canvas: document.getElementById("mouse").getContext("2d"),
    draw: () => {
      let c = display.mouse.canvas
      c.clearRect(0, 0, c.canvas.width, c.canvas.height)

      c.strokeStyle = colors.mouse_outline
      if(mouse.isRight | mouse.isLeft) c.strokeStyle = "#FFFF00"

      c.strokeRect(mouse.data_x * cellSize + camera.x, mouse.data_y * cellSize + camera.y, cellSize, cellSize)

      if(currentType != "wall") {
        let img = new Image()
        img.src = obj_ids[currentType].file
        img.rotation = (rotation*90) * Math.PI/180
        img.translateX = mouse.data_x * cellSize
        img.translateY = mouse.data_y * cellSize

        img.onload = () => {
          c.translate(img.translateX, img.translateY)
          c.rotate(img.rotation)
          c.drawImage(img, 0, 0, cellSize+1, cellSize+1)
          c.rotate(-img.rotation)
          c.translate(-img.translateX, -img.translateY)
        }
      }
    }
  }
}
