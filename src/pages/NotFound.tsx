
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const { countryCode } = useParams();
  
  const goHome = () => {
    if (countryCode) {
      navigate(`/${countryCode}`);
    } else {
      navigate('/');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or might have been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </Button>
          
          <Button onClick={goHome} className="flex items-center gap-2">
            <Home size={18} />
            <span>Go Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
