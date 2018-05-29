function parse(str) {
    let g = str.split("\n")
    for(a in g) {
        if(g[a] != "") {
            let splitentry = g[a].split(" ")
            let type = splitentry[0].replace("!", "");
            document.getElementById("page").innerHTML += `<` + type + `>` + g[a].replace(splitentry[0] + " ", "") + `</` + type + `>`
        }
    }
}

parse(`
!p <i>Written on January 3, 2018 by Trentv4</i>

!center <img src="images/libraria.png"/>

!p <i>This article covers the development of Libraria as it was written, both as a way to keep show my thought process and to organize it as I'm working. This will be heavy on concepts, and light on code, but you will see the results as I work.</i>

!h1 Background <hr/> <!-- --------------------------------------------------------------------------- -->

!p So let's get some background information about this project out now. I had a dream, a few years ago now as of this article, about an endless library. This endless place where you could find long forgotten powers, books on any subject, artifacts just left among the shelves, and haunted by the lost souls of those who had died in that realm. I'm pretty sure the idea originally came from the realm of Hermaeus Mora from the Elder Scrolls games, <a href="http://en.uesp.net/wiki/Lore:Apocrypha">Aprocrypha</a>. I know this idea originated before Skyrim came out, because there's a lot more detail in that article than I had before today. I dropped the idea in a text file (looooong gone) and forgot about it. Later the <a href="https://libraryofbabel.info">Library of Babel</a> came up which fit pretty well, and I dropped that in the file too and forgot about it. At some point I mentioned it to my friend JamiesWhiteShirt, who I bounced some ideas off and wrote down some of his. I wish I had that text file so I could properly attribute who did who.

!p Both of us do Minecraft modding, although he is far more prolific than I am. Eventually JamiesWhiteShirt actually sat down and fleshed the idea out. After a while and a few teaser pictures, he abandoned it and I picked up the idea. I stole the textures shamelessly. You can see the images he posted in the previews right below. Go ahead, click for more details on each image.

!center <a href="images/preview_0.jpg"><img class="small_img" src="images/preview_0.jpg"/></a><a href="images/preview_1.jpg"><img class="small_img" src="images/preview_1.jpg"/></a><a href="images/preview_2.png"><img class="small_img" src="images/preview_2.png"/></a><a href="images/preview_3.png"><img class="small_img" src="images/preview_3.png"/></a><a href="images/preview_4.png"><img class="small_img" src="images/preview_4.png"/></a><a href="images/preview_5.png"><img class="small_img" src="images/preview_5.png"/></a><a href="images/preview_6.png"><img class="small_img" src="images/preview_6.png"/></a><a href="images/preview_7.png"><img class="small_img" src="images/preview_7.png"/></a><a href="images/preview_8.png"><img class="small_img" src="images/preview_8.png"/></a>

!h5 Credit: <a href="http://jamieswhiteshirt.com">JamiesWhiteShirt</a>

!p Looks pretty neat to me. 

!h1 Scope and Ideas <hr/> <!-- ---------------------------------------------------------------------- -->

!p Working from this image, we have a pretty solid foundation of this dimension called Libraria. You can see four distinct zones: charred, wet, some sort of white polished stone (marmor), and classic wooden. Those will become biomes, of sorts. It looks from those images that these zones are constructed out of prefabs, in 8, 16, and 32 block cubed prefabs. 

!p I want Libraria to be part of a greater whole in this mod. The dream is to have several unique dimensions sprouting off Libraria, but those particular ones are outside the scope of this endeavor. For now, I'll mention that they are the Smudged City (located in the burning section, hush hush), an ocean dimension (aptly found in the soaked section), the wood section for the Overworld, and Libraria's own rewards in the marmor section.

!p There's also a really cool book you can see in one of those images, which is used to transport to and from the dimension. This entire idea is JamiesWhiteShirt, as is this implementation. I retained it in my version. I woulld like there to be unique books for each dimension you use to transport between it and Libraria.

!center <img src="images/book.gif"/>
!h5 Credit: <a href="http://jamieswhiteshirt.com">JamiesWhiteShirt</a>

!p Looks pretty neat to me. There's more I want to put in the dimension, but this works for now. The rest would just be iterating.

!h1 Generating Libraria <hr/> <!-- ------------------------------------------------------------------ -->

!p So, worldgen. I've never touched it in Minecraft before, so let's open up a new repository and see what our restrictions are. <a href="https://github.com/trentv4/Dimensions">By the way, it's open source if you want to follow along, roughly.</a> Minecraft generates worlds on a chunk by chunk basis, which are [16, 256, 16] in size. There's a couple stages in chunk generation, but right now I'm only really concerned with placing terrain. This means I'll primarily working with something called a ChunkPrimer, which only grants me access to a 16 * 256 * 16 of block states. No entities, no tile entities, so on and so forth. Super high performance compared to a World though, which is what I'll probably need here. Most clock time will be in actually generating the zones.

!h2 Structures and Templates

!p If I'm going to make this dimension out of prefabs, there should be a way to copy what is built ingame and then place it during world generation. <a href="https://minecraft.gamepedia.com/Structure_Block">IF ONLY THERE WAS A WAY TO DO THAT IN VANILLA.</a> I had the option of either using Structure Blocks and the underlying Template system, which is what vanilla uses, or I can write my own parser, serializer, storage format, deserializer, et cetera...

!p I chose the Template system. Obviously. I'm a lazy sort of guy.

!p So what's the issue with Template systems? There's two main limitations. Templates can only support an area of 32 cubic blocks, which severely limits the area we can use prefabs for. Vanilla gets around that by using several templates for the same structure and being really careful in placing them (see: <a href="https://minecraft.gamepedia.com/Woodland_mansion">Woodland Mansions</a>). In that case, well, not quite as careful - sometimes rooms in woodland mansions don't quite line up, have coherent entrances, and so on. If there was some sort of meta information, this wouldn't be an issue. <i>Almost as if I should have rolled my own...</i>

!p The other issue with Templates is that all the information in it is strictly private. All blocks, all entities. Normally this isn't an issue. The <i>proper</i> way to use Templates is to pass a World into Template#addBlocksToWorld and Template#addEntitiesToWorld. However, when I'm working on generating chunks, it's before I have a World to pass into it. The data is stored in Templates as a private List<Template.BlockInfo> and private List<Template.EntityInfo>. 

!p Bah. I hate it when people try and stop me from letting me do what I want. Normally my options would be limited to reflection, which cuts into the performance I'm trying to optimize for here. Luckily, MinecraftForge has an amazing feature called Access Transformers, which lets me set the access at the decompilation level. You can read more at the <a href="https://tutorials.darkhax.net/tutorials/access_transformers/">wonderful Darkhax tutorial.</a>

!h2 Technique 1: Octrees

!p I'm going to credit the whole next technique to JamiesWhiteShirt, because he came up with it and I don't think he implemented it. The first attempt at generating Libraria is using an octree structure. Just to refresh you, an octree is a tree where each layer has 8 entries. The entry is either a room, or another list of 8 entries down to a minimum size. 

!center <img src="images/octree.png"/>

!h5 Credit: <a href="https://developer.apple.com/documentation/gameplaykit/gkoctree">Apple</a>

!p The technique here is to start at the largest square area we want to generate as a "Zone", traverse the tree, and at every instance decide to randomly place either a room or another layer half the size and recurse. This will result in a structure where you ideally have a balance of every room size. 

!p However, this isn't ideal. Done correctly, this results in a very very very tightly packed world generation of a [64, 64, 64] block (or a [4, 4, 4] chunk) area. This makes it difficult to observe and tweak, particularly when you get down to playing with random values to balance the number of rooms. It also means you're generating a lot of rooms, with a lot of repeat prefabs. The solution to that is to sometimes generate empty space, or create a lot of prefabs which will increase workload dramatically.

!p It is also wise to consider the mistakes of vanilla. There's only one really good example of lots of structure blocks together in vanilla, which is the <a href="https://minecraft.gamepedia.com/Woodland_mansion">Woodland Mansion</a>. Consider this excerpt from the wiki page:

!p <div class="excerpt">... There are many different types of rooms in a woodland mansion. Not all rooms are readily accessible - some have sealed entrances, others have no entrances at all. Not every type of room may exist in a single woodland mansion, as the interior is randomly generated. One may access the individual structures of a woodland mansion by utilizing structure blocks to manually load room structures from ...</div>

!p It would be a massive headache to make sure every room lines up with every other room. It's possible to do this within the same zone by doing two passes on every available room, but once you start working with nearby zones, you start running the risk of runaway world generation plus the massive headache and edge cases for a technique I'm really not a fan of anyway. Next!

!h2 Techique 2: Pillars of Bookshelves

!p ayy lmao gotta work on actually implementing this first

!h1 Building prefabs <hr/> <!-- --------------------------------------------------------------------- -->

!p Alright. Let's see what we're working with. 

!center <img src="images/materials.png"/>
!h5 Credit: <a href="http://trentv.net">Myself</a>

!p Good selection of materials. So we know from the generation section that we can only use 8^3, 16^3, and 32^2 due to limitations in vanilla structures. That's okay, it works for me... for now.

!br <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> 
`)

// Fuck off and stop being nosy. I'm just using this to write easier, and it'll be exported to proper HTML tags later.
// REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE