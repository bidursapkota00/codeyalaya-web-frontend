import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  loading: boolean;
  text: string;
  loadingText: string;
};

export default function Button({ loading, text, loadingText }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      ) : null}
      {loading ? `${loadingText}...` : `${text}`}
    </button>
  );
}
