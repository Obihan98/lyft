import {ButtonGroup, Button, Box} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function PressedButtonFixedPercentage(props) {
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(false);
  const { discount, setDiscount } = props;

  const handleFirstButtonClick = () => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
    setDiscount({ ...discount, type: 'fixed_amount' });
  };
  
  const handleSecondButtonClick = () => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
    setDiscount({ ...discount, type: 'percentage' });
  };

  return (
    <ButtonGroup variant="segmented">
        <Button size= "large" pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
            <span style={{whiteSpace: 'nowrap'}}>Fixed amount</span> 
        </Button>
        <Button size= "large" pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
            Percentage
        </Button>
    </ButtonGroup>
  );
}

export default PressedButtonFixedPercentage;