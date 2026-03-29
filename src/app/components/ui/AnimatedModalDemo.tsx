"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within Modal");
  }
  return context;
};

function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray[0];
  const content = childrenArray.slice(1);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {trigger}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

function ModalTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { open } = useModalContext();
  return (
    <button onClick={open} className={className} type="button">
      {children}
    </button>
  );
}

function ModalContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-neutral-900 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ModalBody({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function ModalFooter({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`flex justify-end space-x-3 mt-6 ${className}`}>{children}</div>;
}


export function AnimatedModalDemo() {
  const images = [
    "image1.jpg",
    "image4.png",
    "image4.png",
    "image3.png",
    "image2.png",
  ];
  return (
   <div className="inline-block mt-4 ml-6">
      <Modal>
        <ModalTrigger className="relative px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group/modal-btn overflow-hidden">
          <span className="transition duration-300 group-hover/modal-btn:-translate-y-10">
            ORDER NOW
          </span>
          <div className="absolute inset-0 flex items-center justify-center translate-y-10 group-hover/modal-btn:translate-y-0 transition duration-300">
            😇
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Below is the order form{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Click
              </span>{" "}
              now! ✨
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt="bali images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScBIHzMGO1OYXiHsvl9BlMFOty49rXYums-vVA78JUuZpfN9A/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition"
              >
                Fill Order Form ✨
              </a>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
          
  <button className="px-4 py-2 bg-gray-300 rounded">
    Close
  </button>


          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}


