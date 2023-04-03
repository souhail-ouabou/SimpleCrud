import { Modal } from 'flowbite-react'
import React from 'react'
import { IoIosPricetags } from 'react-icons/io'
import { MdPlace } from 'react-icons/md'

const ModalComp = ({ show, article, close }) => {
    return (
        <React.Fragment>
            <Modal show={show} position="center" onClose={close}>
                <Modal.Header>{article.title}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <img src="https://flowbite.com/docs/images/blog/image-1.jpg" />
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {article.description}
                        </p>
                        <div className="flex ">
                            <span className="flex items-center justify-start font-semibold text-gray-700 dark:text-gray-400">
                                <MdPlace className="justify-center items-center" />{' '}
                                {article.city}
                            </span>
                            <span className="flex ml-auto items-center justify-start font-semibold text-gray-700 dark:text-gray-400">
                                <IoIosPricetags className="justify-center items-center" />{' '}
                                {article.price}$
                            </span>
                        </div>
                        <span className="flex ml-auto items-center justify-start font-semibold text-gray-700 dark:text-gray-400">
                            Type : {article.type} <br />
                            Surface : {article.surface} m²
                            <br />
                            Number Of Rooms : {article.numberOfRooms}
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default ModalComp
