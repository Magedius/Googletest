import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function WelcomeHero() {
  const { toast } = useToast();

  const checkHealth = async () => {
    try {
      const response = await fetch('/health');
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Health Check Successful",
          description: `Server is healthy. Uptime: ${Math.floor(data.uptime)}s`,
        });
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      toast({
        title: "Health Check Failed",
        description: "Could not reach health endpoint",
        variant: "destructive",
      });
    }
  };

  const showEnvironment = async () => {
    try {
      const response = await fetch('/api/environment');
      const data = await response.json();
      
      const envString = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      
      toast({
        title: "Environment Variables",
        description: envString || "No environment variables found",
      });
    } catch (error) {
      toast({
        title: "Environment Check Failed",
        description: "Could not fetch environment variables",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-google-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-google-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Cloud Run Test Application</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          This simple application demonstrates proper Google Cloud Run deployment configuration, 
          including PORT environment variable handling and container runtime contract compliance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={checkHealth} className="bg-google-blue text-white hover:bg-blue-600">
            Check Health Status
          </Button>
          <Button onClick={showEnvironment} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            View Environment Info
          </Button>
        </div>
      </div>
    </div>
  );
}