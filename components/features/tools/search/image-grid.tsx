import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useMediaQuery } from "~/hooks/use-media-query";
import type { SearchImage } from "~/lib/ai/types";
import { cn } from "~/lib/utils";

interface ImageGridProps {
  images: SearchImage[];
  showAll?: boolean;
}

const PREVIEW_IMAGE_COUNT = {
  MOBILE: 4,
  DESKTOP: 5,
};

export const ImageGrid = ({ images, showAll = false }: ImageGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const displayImages = showAll
    ? images
    : images.slice(
        0,
        isDesktop ? PREVIEW_IMAGE_COUNT.DESKTOP : PREVIEW_IMAGE_COUNT.MOBILE,
      );
  const hasMore =
    images.length >
    (isDesktop ? PREVIEW_IMAGE_COUNT.DESKTOP : PREVIEW_IMAGE_COUNT.MOBILE);

  return (
    <div>
      {/* Mobile: 2 columns with first image large if multiple images */}
      {/* Desktop: 3-4 columns with first image large */}
      <div
        className={cn(
          "grid gap-2",
          // Mobile layout
          "grid-cols-2",
          displayImages.length === 1 && "grid-cols-1",
          // Tablet layout
          "sm:grid-cols-3",
          // Desktop layout
          "lg:grid-cols-4",
          // Reduced height with aspect ratio
          "[&>*]:aspect-[4/3]",
          // First image larger on desktop or when it's the only image
          "[&>*:first-child]:row-span-1 [&>*:first-child]:col-span-1",
          isDesktop &&
            displayImages.length > 1 &&
            "[&>*:first-child]:row-span-2 [&>*:first-child]:col-span-2",
          displayImages.length === 1 &&
            "!grid-cols-1 [&>*:first-child]:!row-span-2 [&>*:first-child]:!col-span-1",
        )}
      >
        {displayImages.map((image, index) => (
          <motion.button
            key={index as React.Key}
            className={cn(
              "relative rounded-xl overflow-hidden group",
              "hover:ring-2 hover:ring-primary hover:ring-offset-2",
              "transition-all duration-200",
              "shadow-sm bg-primary/5 dark:bg-primary/10",
            )}
            onClick={() => {
              setSelectedImage(index);
              setIsOpen(true);
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img
              src={image.url}
              alt={image.description}
              className={cn(
                "w-full h-full object-cover",
                "transition-all duration-500",
                "group-hover:scale-105",
                "opacity-0 [&.loaded]:opacity-100",
              )}
              onLoad={(e) => {
                e.currentTarget.classList.add("loaded");
              }}
            />
            {image.description && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2">
                <p className="text-xs text-white line-clamp-3">{image.description}</p>
              </div>
            )}
            {!showAll && hasMore && index === displayImages.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <span className="text-sm font-medium text-white">
                  +{images.length - displayImages.length}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {isDesktop ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            className="max-w-5xl h-[80vh] p-0 border-0 bg-transparent"
            showClose={false}
          >
            <div className="relative bg-background w-full h-full rounded-2xl overflow-hidden">
              <motion.div
                className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h2 className="text-xl font-medium">Search Images</h2>
                    <p className="text-sm text-white/80">
                      {selectedImage + 1} of {images.length}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="i-hugeicons-cancel-01 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center p-12 mt-[60px] mb-[60px]">
                <motion.img
                  key={images[selectedImage].url}
                  src={images[selectedImage].url}
                  alt={images[selectedImage].description}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <Button
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full",
                  "bg-white/80 dark:bg-black/50 text-black dark:text-white",
                  "hover:bg-white/90 dark:hover:bg-black/70 transition-colors",
                  "border border-neutral-200 dark:border-white/10",
                )}
                onClick={() => {
                  setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }}
              >
                <span className="i-hugeicons-arrow-left-01 h-6 w-6" />
              </Button>
              <Button
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full",
                  "bg-white/80 dark:bg-black/50 text-black dark:text-white",
                  "hover:bg-white/90 dark:hover:bg-black/70 transition-colors",
                  "border border-neutral-200 dark:border-white/10",
                )}
                onClick={() => {
                  setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                }}
              >
                <span className="i-hugeicons-arrow-right-01 h-6 w-6" />
              </Button>

              {images[selectedImage].description && (
                <motion.div
                  className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/40 dark:from-black/60 via-black/20 dark:via-black/40 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-white">
                    {images[selectedImage].description}
                  </p>
                </motion.div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="p-0 h-[80vh] bg-background">
            <div className="relative w-full h-full rounded-t-lg overflow-hidden">
              <motion.div
                className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/40 to-transparent z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h2 className="text-xl font-medium">Search Images</h2>
                    <p className="text-sm text-white/80">
                      {selectedImage + 1} of {images.length}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="i-hugeicons-cancel-01 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center p-12 mt-[60px] mb-[60px]">
                <motion.img
                  key={images[selectedImage].url}
                  src={images[selectedImage].url}
                  alt={images[selectedImage].description}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <Button
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full",
                  "bg-white/80 dark:bg-black/50 text-black dark:text-white",
                  "hover:bg-white/90 dark:hover:bg-black/70 transition-colors",
                  "border border-neutral-200 dark:border-white/10",
                )}
                onClick={() => {
                  setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }}
              >
                <span className="i-hugeicons-arrow-left-01 h-6 w-6" />
              </Button>
              <Button
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full",
                  "bg-white/80 dark:bg-black/50 text-black dark:text-white",
                  "hover:bg-white/90 dark:hover:bg-black/70 transition-colors",
                  "border border-neutral-200 dark:border-white/10",
                )}
                onClick={() => {
                  setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                }}
              >
                <span className="i-hugeicons-arrow-right-01 h-6 w-6" />
              </Button>

              {images[selectedImage].description && (
                <motion.div
                  className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/40 dark:from-black/60 via-black/20 dark:via-black/40 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-white">
                    {images[selectedImage].description}
                  </p>
                </motion.div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
