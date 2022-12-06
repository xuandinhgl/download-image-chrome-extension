import {useEffect, useState} from "react";
import {Storage} from "@plasmohq/storage"

import ImageRow from "~components/ImageRow";

import "./style.css"

export const SELECTOR_KEY = "xdi_image_selector"
export const WATCH_KEY = "xdi_random_key"
export const IMAGES_LIST_KEYS = "xdi_images_list"

function IndexPopup() {
    const storage = new Storage()

    const [selector, setSelector] = useState("img")
    const [images, setImages] = useState([])

    const [imagesSelected, setImageSelected] = useState(new Set([]))

    useEffect(() => {
        (async () => {
            const value = await storage.get(SELECTOR_KEY)
            setSelector(value || selector)

            if (!value) {
                await storage.set(SELECTOR_KEY, selector)
            }
        })()
    }, [])

    storage.watch({
        [IMAGES_LIST_KEYS]: async () => {
            const images = await storage.get<string[]>(IMAGES_LIST_KEYS)
            setImages(images || [])
        }
    })
    const setSelectorToStorage = async (event) => {
        const value = event.target.value
        setSelector(value)

        await storage.set(SELECTOR_KEY, value)
    }

    const handleGetImage = async () => {
        await storage.set(WATCH_KEY, Math.random())
    }

    const handleSelectImage = (url) => {
        if (imagesSelected.has(url)) {
            const i = new Set(imagesSelected)
            i.delete(url)
            setImageSelected(i)
        } else {
            setImageSelected(new Set([...imagesSelected, url]))
        }
    }

    const downloadImage = (images) => {
        setTimeout(() => {
            const urls = Array.from(images)
            urls.forEach((url: string) => {
                const anchor = document.createElement("a")
                anchor.href = url
                anchor.download = "download"
                anchor.click()
            })
        }, 500)
    }

    const downloadSelectedImage = () => {
        downloadImage(imagesSelected)
    }

    return (
        <div className="p-3" style={{width: 450}}>
            <div className="flex gap-x-2 items-center mb-2">
                <input type="text"
                       className="d-input"
                       placeholder="Image selector"
                       value={selector}
                       onChange={(event) => setSelectorToStorage(event)}/>
                <button className="d-btn" disabled={!selector} onClick={handleGetImage}>Get images</button>
            </div>
            {
                images.length > 0 && <div>
                    <h2 className="font-bold text-green-600 mb-1">All images ({images.length})</h2>
                    <div className="img-frame">
                        {
                            images.map((url, index) =>
                                <ImageRow selectImage={handleSelectImage} key={index} url={url}/>
                            )
                        }

                    </div>
                </div>
            }
            <div className="flex gap-x-2 justify-end">
                <button className="d-btn" disabled={imagesSelected.size <= 0} onClick={downloadSelectedImage}>
                    Download selected ({imagesSelected.size})
                </button>
                <button className="d-btn" disabled={images.length <= 0}
                        onClick={() => {
                            downloadImage(images)
                        }}>Download all
                </button>
            </div>
        </div>
    )
}

export default IndexPopup
