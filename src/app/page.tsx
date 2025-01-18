'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import axios from 'axios';



const TranslationPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translations, setTranslations] = useState<string[]>([]);
  
  const translateText = async () => {
    const res=await axios.post('/api/translate', {inputText});
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black flex flex-col items-center p-4">
      <Card className="w-full max-w-lg bg-blue-200">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-gray-800 mb-6">Language Translator</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="w-full text-black p-4 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate"
          />
          <Button
            className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mb-6"
            onClick={()=>translateText()}
          >
            Translate
          </Button>
          <div className="w-full text-black border-rounded-lg shadow-sm">
            {translations.map((translation, index) => (
              <p key={index} className="p-2 bg-white  shadow-sm border-gray-200 rounded-xl mb-2">
                {translation}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationPage;