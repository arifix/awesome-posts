import toast from "react-hot-toast";

const ShopNewSetting = ({ shopId, setShowModal, previewAction }) => {
  return (
    <div className="flex justify-between items-center pr-5 gap-5">
      <h3 className="heading-secondary text-2xl pb-0">Shop Settings</h3>
      <div className="afx-ap-btngroup">
        {shopId ? (
          <button
            type="button"
            className="action-button primary"
            onClick={() => {
              navigator.clipboard.writeText(`[awesome-posts id="${shopId}"]`);
              toast.success("Shortcode Copied Successfully");
            }}
          >
            <i className="dashicons-before dashicons-shortcode"></i> Copy
            Shortcode
          </button>
        ) : (
          ""
        )}
        <button
          type="button"
          className="action-button secondary"
          onClick={() => {
            previewAction();
            setShowModal(true);
          }}
        >
          <i className="dashicons-before dashicons-cover-image"></i>
          Preview
        </button>
      </div>
    </div>
  );
};

export default ShopNewSetting;
