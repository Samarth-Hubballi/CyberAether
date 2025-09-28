import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Copy, Sparkles, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeGenerate?: (prompt: string) => Promise<string>;
}

export default function CodeEditor({ 
  initialCode = '', 
  language = 'javascript',
  onCodeGenerate 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  // Mock code examples for demo
  const mockCodes = [
    `// AI-Generated React Component
function UserProfile({ user }) {
  return (
    <div className="profile-card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}`,
    `// AI-Generated Algorithm
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    `// AI-Generated API Handler
async function handleUserLogin(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Login failed:', error);
  }
}`
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
    setCode(randomCode);
    setOutput('✨ Code generated successfully!');
    setIsGenerating(false);
    setPrompt('');
    
    console.log('AI code generation triggered for:', prompt);
  };

  const handleRun = () => {
    setOutput('Code executed successfully! ✅\nNo errors detected.');
    console.log('Code execution triggered');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setOutput('Code copied to clipboard! 📋');
    console.log('Code copied to clipboard');
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setPrompt('');
    console.log('Code editor reset');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Code Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Prompt Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe what code you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid="input-ai-prompt"
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="bg-gradient-to-r from-primary to-accent"
            data-testid="button-generate-code"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {/* Code Editor */}
        <div className="relative">
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            <Button variant="ghost" size="icon" onClick={handleCopy} data-testid="button-copy-code">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} data-testid="button-reset-code">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRun} data-testid="button-run-code">
              <Play className="h-4 w-4" />
            </Button>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 pt-12 bg-card border border-border rounded-md font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Start typing your code or use AI generation..."
            data-testid="textarea-code-editor"
          />
        </div>

        {/* Output */}
        {output && (
          <div className="p-3 bg-muted rounded-md border">
            <pre className="text-sm text-foreground whitespace-pre-wrap" data-testid="text-code-output">
              {output}
            </pre>
          </div>
        )}

        {/* Language Badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Language: <span className="text-primary font-mono">{language}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            Lines: {code.split('\n').length}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}