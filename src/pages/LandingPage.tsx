import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { useInterview } from '../context/InterviewContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setResume } = useInterview();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setResume(acceptedFiles[0]);
      navigate('/interview');
    }
  }, [navigate, setResume]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Interview
        </h1>
        <p className="text-xl text-gray-600">
          Upload your resume to begin your personalized interview experience
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`mt-8 p-12 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="space-y-2">
            <p className="text-xl font-medium text-gray-900">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
            </p>
            <p className="text-gray-500">or click to browse files</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>Accepted formats: PDF, DOC, DOCX</span>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          What to Expect
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Resume Upload',
              description: 'Start by sharing your professional experience'
            },
            {
              title: 'Interview Questions',
              description: 'Answer tailored questions based on your profile'
            },
            {
              title: 'Detailed Feedback',
              description: 'Receive comprehensive feedback and insights'
            }
          ].map((step, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50">
              <div className="font-semibold text-lg text-gray-900 mb-2">
                {step.title}
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}