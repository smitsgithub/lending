import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SupplyBorrowCard } from "./supplyBorrowCard";
import { Action, ProperCoin, RestorativeAction } from "../../commonTypes";
export const CardDialog = ({
  dialogProps,
  onOpenChange,
}: {
  dialogProps: {
    action: Action | RestorativeAction;
    coin: ProperCoin;
    amount?: string;
  } | null;
  onOpenChange?(open: boolean): void;
}) => {
  return (
    !!dialogProps && (
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[580px] w-full flex flex-col gap-6">
          <SupplyBorrowCard
            defaultAction={dialogProps.action}
            defaultCoin={dialogProps.coin}
            totalAmount={dialogProps.amount}
          />
        </DialogContent>
      </Dialog>
    )
  );
};
