import produce from "immer";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { ToastContent } from "../../lib/types";

interface UserStoreState {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  isAutoSwitch: boolean;
  setAutoSwitch: (isAutoSwitch: boolean) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  allToastContents: ToastContent[];
  toastContent: ToastContent;
  setToastContent: (toastContent: ToastContent) => void;
  showAdvanced: boolean;
  setShowAdvanced: (showAdvanced: boolean) => void;
}

export const useUserStore = create<UserStoreState>(
  devtools(
    (set, get) => ({
      activeTab: "damm",
      setActiveTab: (activeTab) => set(() => ({ activeTab: activeTab })),
      isAutoSwitch: false,
      setAutoSwitch: (isAutoSwitch) =>
        set(() => ({ isAutoSwitch: isAutoSwitch })),
      isOpen: false,
      setOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
      toastContent: {
        title: "",
        description: "",
        type: "success",
      },
      allToastContents: [],
      setToastContent: (toastContent) => {
        set(
          produce((draft: UserStoreState) => {
            draft.toastContent = toastContent;
            draft.allToastContents.push(toastContent);
          })
        );
      },
      showAdvanced: false,
      setShowAdvanced: (showAdvanced) =>
        set(() => ({ showAdvanced: showAdvanced })),
    }),
    {
      name: "userStore",
    }
  )
);
