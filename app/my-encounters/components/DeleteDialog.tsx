"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, X } from "lucide-react";
import { deleteEncounter } from "@/actions/encounterActions";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
  confirmText: string;
  deleteFunction: () => Promise<void>;
  errorText: string;
  trigger: JSX.Element;
};

export default function DeleteDialog({
  title,
  description,
  confirmText,
  deleteFunction,
  errorText,
  trigger,
}: Props) {
  // export default function DeleteDialog({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await deleteFunction();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(errorText, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
        {/* <X className="h-8 w-8 text-red-700 cursor-pointer" /> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
          <AlertDialogDescription>
            {description}
            {/* cannot be undone. This will permanently delete your encounter. */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleClick}
            // onClick={handleClick}
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : confirmText}
            {/* {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Delete Encounter"} */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
