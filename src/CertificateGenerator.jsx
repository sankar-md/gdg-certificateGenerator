import React, { useState, useRef } from "react";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import html2pdf from "html2pdf.js";

import fakeData from "./fakeData.json"; // Sample data

export default function CertificateGenerator() {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const certificateRefs = useRef([]);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const downloadCertificates = () => {
    certificateRefs.current.forEach((certificateElement, index) => {
      if (certificateElement) {
        const options = {
          margin: 0,
          filename: `${fakeData[index].name}-gdg-certificate.pdf`,
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape",
          },
        };

        html2pdf().from(certificateElement).set(options).save();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-4">
        <marquee
          behavior="scroll"
          direction="left"
          className="text-lg text-center text-red-600 font-bold"
        >
          Keep the page zoomed out to have a perfect view
        </marquee>
        <h2 className="text-2xl font-bold mb-4">GDG Event Information</h2>
        <div className="max-w-md mb-4">
          <Label htmlFor="eventType">What is Event</Label>
          <Input
            id="eventType"
            value={eventType}
            onChange={handleEventTypeChange}
            placeholder="Enter event type (e.g., Tech Winter Break)"
            className="mb-2"
          />
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={handleEventNameChange}
            placeholder="Enter GDG event name"
            className="mb-2"
          />
        </div>
        <Button onClick={downloadCertificates} className="mb-8">
          Download All Certificates
        </Button>
      </div>
      {/* Display a preview of the certificates */}
      <div className="space-y-8 overflow-x-hidden flex flex-col items-center max-w-full pb-8">
        {fakeData.map((candidate, index) => (
          <div key={index} className="flex items-center justify-center">
            <Card className="w-full max-w-[297mm] max-h-[210mm] bg-white shadow-none rounded-none overflow-hidden">
              <div
                ref={(el) => (certificateRefs.current[index] = el)}
                className="relative w-full max-w-none h-[210mm] p-8 bg-gradient-to-br from-blue-50 to-green-50 flex flex-col justify-between"
                style={{ width: "297mm", height: "210mm" }} // Ensure proper size
              >
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-[30%] h-[35%] bg-blue-500 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-0 right-0 w-[30%] h-[35%] bg-red-500 rounded-full opacity-70 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[35%] bg-yellow-500 rounded-full opacity-70 -translate-x-1/2 translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[30%] h-[35%] bg-green-500 rounded-full opacity-70 translate-x-1/2 translate-y-1/2" />

                {/* SVG Background */}
                <div className="absolute inset-0 z-0 opacity-5">
                  <svg
                    className="w-full h-full"
                    viewBox="0 -65.5 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M184.31481,67.7044587 C197.78381,59.9684587 211.21681,52.1694587 224.73181,44.5134587 C237.55981,37.2454587 252.65281,43.9484587 255.56081,58.0924587 C257.24381,66.2744587 253.59081,75.1134587 246.20381,79.4184587 C221.98581,93.5314587 197.73281,107.588459 173.35881,121.430459 C165.81481,125.714459 158.04381,124.926459 151.16881,119.676459 C144.18481,114.346459 141.98381,106.994459 143.62181,98.4374587 C145.49181,91.9234587 149.77181,87.5684587 155.60881,84.3104587 C165.25981,78.9244587 174.75381,73.2544587 184.31481,67.7044587"
                        fill="#FABC05"
                      ></path>
                      <path
                        d="M194.20341,62.0789587 C180.76841,54.2829587 167.29941,46.5479587 153.91141,38.6729587 C141.20241,31.1969587 139.46241,14.7749587 150.25641,5.18295871 C156.50041,-0.364041286 165.98141,-1.62104129 173.40341,2.62395871 C197.73541,16.5409587 222.03541,30.5169587 246.20941,44.7039587 C253.69141,49.0949587 256.89341,56.2199587 255.78641,64.7989587 C254.66141,73.5109587 249.39541,79.0929587 241.16641,81.9539587 C234.58941,83.5919587 228.67841,82.0619587 222.93841,78.6359587 C213.44741,72.9709587 203.79041,67.5829587 194.20341,62.0789587"
                        fill="#109D58"
                      ></path>
                      <path
                        d="M71.7518102,56.5628587 C63.1308102,61.4608587 54.5048102,66.3498587 45.8928102,71.2628587 C40.8548102,74.1368587 35.8728102,77.1088587 30.8088102,79.9348587 C20.6058102,85.6298587 8.48381017,82.2918587 2.69881017,72.2608587 C-2.82218983,62.6888587 0.35081017,50.2788587 10.1768102,44.5428587 C34.2018102,30.5198587 58.2888102,16.5988587 82.4628102,2.83385871 C89.8768102,-1.38814129 97.5688102,-0.857141286 104.42481,4.18985871 C111.66081,9.51685871 114.02981,17.0128587 112.40481,25.8008587 C111.39681,27.9268587 110.79481,30.4198587 109.28581,32.0948587 C106.83081,34.8198587 104.04081,37.4288587 100.93481,39.3448587 C91.3228102,45.2718587 81.4958102,50.8498587 71.7518102,56.5628587"
                        fill="#E94436"
                      ></path>
                      <path
                        d="M61.8670102,62.0569587 C70.4200102,67.0729587 78.9670102,72.0999587 87.5280102,77.1019587 C92.5350102,80.0279587 97.6000102,82.8569587 102.57901,85.8279587 C112.61301,91.8179587 115.78401,103.983959 109.98901,114.008959 C104.45901,123.576959 92.1260102,127.034959 82.2450102,121.391959 C58.0880102,107.596959 33.9890102,93.6989587 9.98101017,79.6459587 C2.61801017,75.3359587 -0.76798983,68.4089587 0.17501017,59.9479587 C1.17001017,51.0169587 6.47701017,45.2179587 14.9000102,42.2309587 C17.2450102,42.0419587 19.7050102,41.3159587 21.9110102,41.7859587 C25.4980102,42.5499587 29.1530102,43.6609587 32.3650102,45.3929587 C42.3040102,50.7529587 52.0480102,56.4749587 61.8670102,62.0569587"
                        fill="#4385F3"
                      ></path>
                    </g>
                  </svg>
                </div>
                {/* Certificate Content */}
                <div className="relative z-10 flex flex-col items-center justify-between h-full text-center">
                  {/* Header */}
                  <div className="w-full pt-8">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-800">
                      Google Developer Groups
                    </h1>
                    <div className="w-[550px] h-px bg-gray-300 mt-7 mx-auto"></div>
                    <p className="text-sm font-semibold text-gray-600">
                      OnCampus
                    </p>
                    <h1 className="text-4xl font-bold text-gray-800">
                      SIMATS Engineering
                    </h1>
                    {eventType && (
                      <p className="text-2xl font-semibold text-blue-600 mt-3">
                        {eventType}
                      </p>
                    )}
                    <p className="text-xl text-gray-600 mt -2 mb-2">
                      Certificate of Achievement
                    </p>
                  </div>

                  {/* Main Content */}
                  <div className="flex-grow flex flex-col justify-center items-center w-full px-4">
                    <p className="text-2xl text-gray-700 mb-2">
                      This is to certify that
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                      {candidate.name}
                    </h2>
                    <div className="w-[500px] h-px bg-gray-300  mx-auto mt-2"></div>
                    <p className="text-2xl text-gray-700 mb-2 mt-2">
                      has successfully participated in
                    </p>
                    <div className="bg-white bg-opacity-50 px-8 py-2 rounded-lg mb-6">
                      <h3 className="text-3xl font-semibold text-blue-600">
                        {eventName || "GDG Event"}
                      </h3>
                    </div>
                    <p className="text-xl text-gray-600">
                      demonstrating exceptional engagement and contribution to
                      the developer community.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="w-full pb-4">
                    <div className="flex justify-between items-end">
                      <div className="text-left">
                        <p className="text-lg font-semibold text-gray-800">
                          {candidate.collegeName}
                        </p>
                        <p className="text-md text-gray-600">
                          {candidate.yearOfStudy}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          GDG Chapter Lead
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <p className="text-sm text-gray-500">
                        This certificate was awarded on{" "}
                        {new Date().toLocaleDateString()} as part of the Google
                        Developer Groups program.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
