import { IconSearch } from "@tabler/icons-react";
import { ModalBody, ModalContent, ModalTrigger } from "../ui/animated-modal";
import { cn } from "~/lib/utils";

export function SearchTrigger({ className, showText }: { className?: string; showText?: boolean }) {
  return (
    <ModalTrigger
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-linear-(--btn-gradient) [&_svg]:size-4",
        {
          "p-0! size-10": !showText,
          "gap-2 py-2 px-3.5 ": showText,
        },
        [className],
      )}
    >
      <IconSearch stroke={2} />
      {showText && <span className="text-xs">Search</span>}
    </ModalTrigger>
  );
}

export function SearchModal() {
  return (
    <ModalBody>
      <ModalContent>TEST.......</ModalContent>
    </ModalBody>
  );
}
