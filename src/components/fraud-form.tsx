"use client";

import { useRef, useState } from 'react';
import { FileJson, Image as ImageIcon, Upload, X, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';

type FraudFormProps = {
  formAction: (payload: FormData) => void;
  onFormSubmit: () => void;
};

const sampleJson = {
  "transaction": {
    "id": "txn_12345",
    "amount": 99.99,
    "currency": "USD",
    "timestamp": "2024-05-21T10:00:00Z"
  },
  "user": {
    "id": "user_67890",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "ip_address": "198.51.100.1"
  },
  "billing_address": {
    "street": "123 Fake St",
    "city": "Anytown",
    "zip": "12345",
    "country": "USA"
  }
};


export default function FraudForm({ formAction, onFormSubmit }: FraudFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setImagePreview(null);
        if (e.target) e.target.value = '';
    }
  };
  
  const handleAction = (formData: FormData) => {
    onFormSubmit();
    formAction(formData);
  };
  
  const handleImageRemove = () => {
      setImagePreview(null);
      if (formRef.current) {
          const imageInput = formRef.current.querySelector('input[name="image"]') as HTMLInputElement;
          if (imageInput) imageInput.value = '';
      }
  }

  return (
    <form ref={formRef} action={handleAction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileJson className="w-5 h-5" />
              Transaction Data
            </CardTitle>
            <CardDescription>
              Paste the transaction data in JSON format below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="jsonData" className="sr-only">JSON Data</Label>
            <Textarea
              id="jsonData"
              name="jsonData"
              rows={12}
              className="font-code text-sm"
              placeholder="Enter JSON data here..."
              defaultValue={JSON.stringify(sampleJson, null, 2)}
              required
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ImageIcon className="w-5 h-5" />
              Supporting Document
            </CardTitle>
            <CardDescription>
              Upload an image of a supporting document (e.g., ID, receipt).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="image" className="sr-only">Supporting Document</Label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="Image preview" className="w-full h-auto max-h-60 object-contain rounded-md border" />
                  <button type="button" onClick={handleImageRemove} className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm rounded-full p-1 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove image</span>
                  </button>
                  <Input id="image" name="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
              ) : (
                <div className="w-full aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center p-4">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="font-semibold mb-1">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  <Input id="image" name="image" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Analyze Transaction"
      )}
    </Button>
  );
}
