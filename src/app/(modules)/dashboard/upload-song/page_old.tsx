"use client";

import base from "@/api_request/axios";
import END_POINTS from "@/api_request/endPoints";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const files = Array.from(event.target.files);

    // Validate file types
    const invalidFiles = files.filter(
      file => !["audio/mpeg", "audio/wav"].includes(file.type)
    );

    if (invalidFiles.length) {
      toast.error("Please select only MP3 or WAV files");
      return;
    }

    setSelectedFiles(files);
    // Initialize status and progress for each file
    setUploadStatus(prev => ({
      ...prev,
      ...Object.fromEntries(files.map(file => [file.name, "Ready to upload"]))
    }));
    setUploadProgress(prev => ({
      ...prev,
      ...Object.fromEntries(files.map(file => [file.name, 0]))
    }));
  };

  const handleMultipleFileUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select files to upload");
      return;
    }

    setIsUploading(true);
    const chunkSize = 5 * 1024 * 1024; // 5MB

    try {
      await Promise.all(selectedFiles.map(file => uploadFile(file, chunkSize)));
      toast.success("All files uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Some files failed to upload");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFile = async (file: File, chunkSize: number) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uniqueId = generateUniqueId(file.name);
    let chunkNumber = 0;
    let currentProgress = 0;

    // Start progress animation
    const progressInterval = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress = Math.min(currentProgress + 1, 99); // Cap at 99% until complete
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: currentProgress
        }));
        setUploadStatus(prev => ({
          ...prev,
          [file.name]: `Uploading... ${currentProgress}%`
        }));
      }
    }, 100); // Update every 300ms

    try {
      setUploadStatus(prev => ({ ...prev, [file.name]: "Starting upload..." }));

      while (chunkNumber < totalChunks) {
        const start = chunkNumber * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber.toString());
        formData.append("totalChunks", totalChunks.toString());
        formData.append("originalname", file.name);
        formData.append("uniqueId", uniqueId);

        await base.post(END_POINTS.music_upload, formData);
        chunkNumber++;
      }

      // Complete the upload
      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      setUploadStatus(prev => ({ ...prev, [file.name]: "Upload complete (100%)" }));

    } catch (error) {
      clearInterval(progressInterval);
      setUploadStatus(prev => ({ ...prev, [file.name]: "Upload failed" }));
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      throw error;
    }
  };

  // Helper function to generate unique ID
  const generateUniqueId = (filename: string) => {
    return `${filename}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    const removedFile = newFiles.splice(index, 1)[0];
    setSelectedFiles(newFiles);

    // Clean up status and progress
    setUploadStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[removedFile.name];
      return newStatus;
    });
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[removedFile.name];
      return newProgress;
    });
  };

  return (
    <TabsContent value="file" className="space-y-4 ">
      <div className="grid w-full items-center gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Select the file</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="col-span-full">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <CloudUpload className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative 
                        cursor-pointer 
                        rounded-md
                         bg-white
                          font-semibold
                           text-indigo-600
                            focus-within:outline-hidden
                             hover:text-indigo-500
                              items-center
                               justify-center"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        multiple
                        onChange={handleFileChange}
                        name="file-upload"
                        type="file"
                        accept=".mp3,.wav,audio/mpeg,audio/wav"
                        className="sr-only"
                        disabled={isUploading}
                      />
                    </label>

                  </div>
                  <p className="text-xs/5 text-gray-600 dark:text-white">
                    MP3 or WAV files only
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="truncate">{file.name}</p>
                        <span className="font-medium text-blue-600">
                          {uploadProgress[file.name] || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress[file.name] || 0}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {uploadStatus[file.name] || "Ready to upload"}
                      </p>
                    </div>
                    {uploadProgress[file.name] < 100 && <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      Remove
                    </Button>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            onClick={handleMultipleFileUpload}
            disabled={isUploading || selectedFiles.length === 0}
          >
            {isUploading ? "Uploading..." : "Upload All"}
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}
