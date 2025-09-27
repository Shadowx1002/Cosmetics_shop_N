import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Y2FvY2VoaXFsbGl1cHFtaHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4OTkyMDIsImV4cCI6MjA3NDQ3NTIwMn0.6G8u2xtM2zsqy9SOCBnuLGM2PACf_zRI1grJacUCQDI";
const url = "https://nvcaocehiqlliupqmhxu.supabase.co";
const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("no file selected");
      return;
    }
    const newtimesamp = Date.now();
    const newName = newtimesamp + file.name;

    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
          .data.publicUrl;

        resolve(publicUrl);
      })
      .catch((e) => {
        reject("Error occurd in Supabase connection");
      });
  });

  return mediaUploadPromise;
}
