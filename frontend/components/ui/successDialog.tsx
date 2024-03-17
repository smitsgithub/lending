import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import NounBorrowed from "./NounBorrowed.gif";
import NounSupplied from "./NounSupplied.gif";
import { Action, ProperCoin, RestorativeAction } from "../../commonTypes";
const srcByAction = {
  Supply: NounSupplied,
  Borrow: NounBorrowed,
  Repay: NounSupplied,
  Withdraw: NounBorrowed,
};
export const SuccessDialog = ({
  dialogProps,
  onOpenChange,
}: {
  dialogProps: {
    action: Action | RestorativeAction;
    coin: ProperCoin;
    amount: string;
  } | null;
  onOpenChange?(open: boolean): void;
}) => {
  return (
    !!dialogProps && (
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[580px] w-full flex flex-col gap-6">
          <Image
            src={srcByAction[dialogProps.action]}
            alt="Success Illustration"
          />
        </DialogContent>
      </Dialog>
    )
  );
};
