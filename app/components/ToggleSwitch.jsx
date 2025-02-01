import React, { useState } from "react";
import "./ToggleSwitch.css";

import {
    Badge,
    InlineStack
} from "@shopify/polaris";

const ToggleSwitch = ({ rounded = false, checked = false, onToggle }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked); // Update local state
    onToggle(!isChecked); // Call parent handler if provided
  };

  return (
    <InlineStack gap="200">
			<label className="switch">
				<input
					type="checkbox"
					checked={isChecked}
					onChange={handleChange}
				/>
				<span className={`slider ${rounded ? "round" : ""}`}></span>
			</label>
			{isChecked ? <Badge tone="success">Active</Badge> : <Badge tone="attention">Inactive</Badge>}
    </InlineStack>
  );
};

export default ToggleSwitch;