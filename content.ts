import {Storage} from "@plasmohq/storage"
import {IMAGES_LIST_KEYS, SELECTOR_KEY, WATCH_KEY} from "~popup";


(async () => {
    const storage = new Storage()
    const selector = await storage.get(SELECTOR_KEY)
    const getImages = async () => {
        const images = document.querySelectorAll<HTMLImageElement>(selector)

        const imageSrc = Array.from(images).map(i => i.currentSrc).filter(img => !!img)
        await storage.set(IMAGES_LIST_KEYS, Array.from(new Set([...imageSrc])))
    }
    storage.watch({
        [WATCH_KEY]: async () => {
            await storage.set(IMAGES_LIST_KEYS, [])
            await getImages()
        }
    })
})()


export {}