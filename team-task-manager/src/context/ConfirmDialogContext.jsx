import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const ConfirmDialogContext = createContext(null);

export function ConfirmDialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
  });

  const resolveRef = useRef(null);

  const closeDialog = useCallback((result) => {
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = null;
    }

    setDialog({
      isOpen: false,
      message: "",
    });
  }, []);

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      if (resolveRef.current) {
        resolveRef.current(false);
      }

      resolveRef.current = resolve;

      setDialog({
        isOpen: true,
        message,
      });
    });
  }, []);

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      {dialog.isOpen && (
        <div
          className="modal-overlay"
          onClick={() => closeDialog(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>تأیید حذف</h3>

            <p>{dialog.message}</p>

            <div className="modal-actions">
              <button
                className="btn-danger"
                onClick={() => closeDialog(true)}
              >
                بله، حذف شود
              </button>

              <button
                className="btn-secondary"
                onClick={() => closeDialog(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error(
      "useConfirm باید داخل ConfirmDialogProvider استفاده شود."
    );
  }

  return context.confirm;
}