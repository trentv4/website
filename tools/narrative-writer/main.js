window.get = (e) => document.getElementById(e)
window.make = (e) => document.createElement(e)

function paramGet(params, index) {
    console.log(index)
    if(get(index).value != "") return get(index).value
    return params[index][1]
}

const narratives = {
    NARRATIVE_BLS_IFT: {
        name: "BLS Inter-facility transfer",
        params: [
            ["Company", "-----", "short"],
            ["Rig #", "-----", "short"],
            ["Referring hospital", "-----", "short",],
            ["Referring department", "-----", "short"],
            ["Referring room", "-----", "short"],
            ["Receiving hospital", "-----", "short"],
            ["Receiving department", "-----", "short"],
            ["Receiving room", "-----", "short"],
            ["Receiving nurse", "-----", "short"],
            ["Age", "-----", "short"],
            ["Gender", "-----", "short"],
            ["Chief complaint", "-----", "long"],
            ["Transportation reason", "-----", "long"],
            ["Vitals attached to report?", " attached to the report.", "long"],
            ["Remained stable during transport?", "remained stable", "long"],
            ["Remained unchanged during transport?", "remained unchanged.", "long"],
            ["Treatment administered?", "", "long"],
            ["Receiving nurse", "the room RN", "short"]],
        make: () => {
            let params = narratives.NARRATIVE_BLS_IFT.params
            let narrative = ""
            narrative += paramGet(params, 0) + " "
            narrative += paramGet(params, 1)
            narrative += " responded to "
            narrative += paramGet(params, 2)
            narrative += " for an Inter-facility transfer from the "
            narrative += paramGet(params, 3)
            narrative += ", room "
            narrative += paramGet(params, 4)
            narrative += " to "
            narrative += paramGet(params, 5)
            narrative += ". The patient was a "
            narrative += paramGet(params, 9)
            narrative += " yr old "
            narrative += paramGet(params, 10)
            narrative += " that was admitted to "
            narrative += paramGet(params, 2)
            narrative += " for "
            narrative += paramGet(params, 11)
            narrative += ". The patient required ambulance transportation due to "
            narrative += paramGet(params, 12)
            narrative += ". The patient's vital signs were "
            narrative += paramGet(params, 13)
            narrative += " and "
            narrative += paramGet(params, 14)
            narrative += " during transport. The patient was placed on a "
            narrative += paramGet(params, 0)
            narrative += " stretcher and secured with safety belts. During transport, the patient "
            narrative += paramGet(params, 15)
            narrative += ". "
            narrative += paramGet(params, 16)
            narrative += "Upon arrival at "
            narrative += paramGet(params, 5)
            narrative += " the patient was taken to "
            narrative += paramGet(params, 6)
            narrative += ", room "
            narrative += paramGet(params, 7)
            narrative += ". All personal property and transport paperwork were turned over to "
            narrative += paramGet(params, 17)
            narrative += "."
            get("output").value = narrative
        },
        select: () => {
            let container = get("information-flex")
            container.innerHTML = ""
            let params = narratives.NARRATIVE_BLS_IFT.params
            params.forEach( (value, index, array) => {
                let out = ""
                console.log(value[2])
                if(value[2] == "short") {
                    out = `<p>` + value[0] + `: <input type="text" id="` + index + `"></input></p>`
                }
                if(value[2] == "long") {
                    out = `<p>` + value[0] + `: <textarea id="` + index + `"></textarea></p>`
                }
                container.innerHTML += out
            })
        }
    }
}

narratives.NARRATIVE_BLS_IFT.select()
narratives.NARRATIVE_BLS_IFT.make()
