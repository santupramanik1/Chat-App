import {Loader2, Paperclip, Send, X} from "lucide-react";
import React, {useState} from "react";

interface MessageInputProps {
    selectedUser: string | null;
    message: string;
    setMessage: (message: string) => void;
    handleMessageSend: (e: any, imageFile?: File | null) => void;
}
export const MessageInput = ({selectedUser, message, setMessage, handleMessageSend}: MessageInputProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!message.trim() && !imageFile) {
            return;
        }

        setIsUploading(true);
        await handleMessageSend(e, imageFile);
        setImageFile(null);
        setIsUploading(false);
    };

    if (!selectedUser) return null;

    return (
        <form className="flex flex-col gap-2 border-t border-gray-700 pt-2" onSubmit={handleSubmit}>
            {imageFile && (
                <div className="relative w-fit">
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                    ></img>
                    <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-black rounded-full p-1"
                        onClick={() => setImageFile(null)}
                    >
                        <X className="w-4 h-4 text-white cursor-pointer" />
                    </button>
                </div>
            )}

            {/* Input box  */}
            <div className="flex items-center gap-2">
                <label className="cursor-pointer bg-gray-200 hover:bg-gray-400 rounded-lg px-3 py-2 transition-colors">
                    <Paperclip size={18} className="text-black" />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.type.startsWith("image")) {
                                setImageFile(file);
                            }
                        }}
                    />
                </label>

                <input
                    type="text"
                    className="flex-1 bg-gray-200 rounded-lg px-4 py-2 text-black placeholder-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder={imageFile ? "Add a caption..." : "Type a message..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={(!imageFile && !message) || isUploading}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer"
                >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
            </div>
        </form>
    );
};
