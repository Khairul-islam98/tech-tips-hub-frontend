import { Thumbnail } from "./thumbnail";
import { motion } from "framer-motion";

const ImageGrid = ({ images }: { images: string[] }) => {
    // Define animation properties
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div
            className={`grid ${
                images.length === 1
                    ? "grid-cols-1"
                    : images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
            } gap-4 mb-6`}
        >
            {images.map((imageUrl: string, index: number) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: index * 0.1 }} 
                >
                    <Thumbnail url={imageUrl} />
                </motion.div>
            ))}
        </div>
    );
};

export default ImageGrid;
