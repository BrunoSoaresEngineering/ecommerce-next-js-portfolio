import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
      size="lg"
    >
      {pending ? 'Sending...' : 'Send'}
    </Button>
  );
}
export default SubmitButton;
