import { CustomButton } from '@/components'
import { sharingInformationService } from '@/utilities'

function NewEmailButton() {
  const handleClick = () => {
    sharingInformationService.setSubject(true)
  }

  return <CustomButton onClick={handleClick}>New Email </CustomButton>
}
export default NewEmailButton
