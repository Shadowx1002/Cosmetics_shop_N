import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZXdydHlsaHRpbmh0ZWhtYWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMTcxNjEsImV4cCI6MjA3NTY5MzE2MX0.T1j4RMdAiAvzVybSif2xmhK8pmrEq9l9BJxtbbjWITA";
const url = "https://vbewrtylhtinhtehmabt.supabase.co";
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
      .from("new")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage.from("new").getPublicUrl(newName)
          .data.publicUrl;

        resolve(publicUrl);
      })
      .catch((e) => {
        reject("Error occurd in Supabase connection");
      });
  });

  return mediaUploadPromise;
}
