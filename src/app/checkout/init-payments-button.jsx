import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import API_CONFIG from '@/config/api.config'
import useMutation from '@/lib/hooks/useMutation'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'

const InitiatePaymentsButton = ({ id }) => {
  const [showDialog, setShowDialog] = useState(false)

  const { mutate, pending } = useMutation(
    API_CONFIG.BOOKING.PAYMENT_BOOKING.URL(id),
    API_CONFIG.BOOKING.PAYMENT_BOOKING.METHOD
  )

  const initiatePayment = () => {
    mutate(null, {
      onSuccess: (response) => {
        window.location.href = response.data.sessionUrl
      },
      onError: (error) => {
        toast('Error: ' + error.status, {
          type: 'error',
          description: error.message,
        })
      },
    })
  }

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          disabled={pending}
          className="w-full h-12 shadow-lg uppercase text-base font-semibold transition-opacity  bg-purple-700 hover:bg-purple-700/80"
        >
          <Icon size="30" icon="shield" />
          Proceed to Pay
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Test Payment Notice</AlertDialogTitle>
          <AlertDialogDescription>
            This application is currently under development. Please use the following dummy card details to complete your payment:
            <ul className="mt-2 ml-4 list-disc text-sm text-left space-y-1">
              <li><strong>Card Number:</strong> 4242 4242 4242 4242</li>
              <li><strong>Expiry:</strong> 12/35</li>
              <li><strong>CVV:</strong> 111</li>
              <li>Other details like name, address, etc. can be anything.</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={initiatePayment}>Continue to Payment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InitiatePaymentsButton
