import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image"; // For image export
import { saveAs } from "file-saver"; // To save the generated file

const CertificateGenerator = () => {
  const [participants, setParticipants] = useState([]);

  const fetchGoogleSheetData = async () => {
    const SHEET_API_URL = "YOUR_GOOGLE_SHEETS_API_URL";
    const response = await fetch(SHEET_API_URL);
    const data = await response.json();
    return data; // Assuming the data is an array of participant details.
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await fetchGoogleSheetData(); // Replace with your function
      setParticipants(data);
    };
    fetchParticipants();
  }, []);

  const downloadCertificate = async (participant) => {
    const certificateNode = document.getElementById(
      `certificate-${participant.id}`
    );
    const image = await toPng(certificateNode);
    saveAs(image, `${participant.name}_Certificate.png`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        GDG Certificate Generator
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {participants.map((participant) => (
          <Card key={participant.id} className="bg-white">
            <CardContent>
              {/* Certificate Design */}
              <div
                id={`certificate-${participant.id}`}
                className="p-6 border-8 border-blue-100"
              >
                <h2 className="text-4xl font-bold text-center mb-6">
                  Certificate of Achievement
                </h2>
                <p className="text-lg text-center">
                  This is to certify that{" "}
                  <span className="font-bold">{participant.name}</span> has
                  successfully completed{" "}
                  <span className="font-bold">{participant.eventName}</span> on{" "}
                  {new Date(participant.eventDate).toLocaleDateString()} at{" "}
                  <span className="font-bold">{participant.eventLocation}</span>
                  .
                </p>
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => downloadCertificate(participant)}
              >
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CertificateGenerator;
