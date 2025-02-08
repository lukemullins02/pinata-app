"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      setUrl(ipfsUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <main className="w-full min-h-screen bg-slate-500 flex flex-col justify-center items-center p-6">
      <input
        type="file"
        className="px-6 py-2 bg-white text-black text-xl font-semibold rounded shadow-lg hover:bg-gray-100 transition-transform transform"
        onChange={handleChange}
      />
      <button
        className="mt-4 px-6 py-2 bg-white text-black text-xl font-semibold rounded shadow-lg hover:bg-gray-100 transition-transform transform"
        type="button"
        disabled={uploading}
        onClick={uploadFile}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <div className="mt-6">
          <img
            src={url}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-lg border border-gray-300 shadow-md"
          />
        </div>
      )}
    </main>
  );
}
