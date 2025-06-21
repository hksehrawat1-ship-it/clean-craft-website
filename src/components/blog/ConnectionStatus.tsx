
import React from "react";
import { useStrapiConnection } from "@/contexts/StrapiConnectionContext";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from "lucide-react";

const ConnectionStatus = () => {
  const { isConnected, isInitializing, error, retryConnection } = useStrapiConnection();

  if (isInitializing) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-4 sm:mx-6 lg:mx-8">
        <div className="flex items-center">
          <Loader2 className="h-4 w-4 text-blue-400 animate-spin mr-2" />
          <p className="text-sm text-blue-700">Connecting to content service...</p>
        </div>
      </div>
    );
  }

  if (!isConnected && error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 sm:mx-6 lg:mx-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
            <div>
              <p className="text-sm text-red-700 font-medium">
                Unable to load blog content
              </p>
              <p className="text-xs text-red-600 mt-1">
                Please check your connection and try again
              </p>
            </div>
          </div>
          <Button
            onClick={retryConnection}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="bg-green-50 border-l-4 border-green-400 p-3 mx-4 sm:mx-6 lg:mx-8">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
          <p className="text-sm text-green-700">Content loaded successfully</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ConnectionStatus;
