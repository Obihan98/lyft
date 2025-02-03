import {
	EmptyState,
	Card
} from "@shopify/polaris";

function EmptySplitRules(props) {
	const { setNewDiscountModalActive } = props;

	return (
		<Card>
			<EmptyState
			heading="Manage your split rules"
			action={{content: 'Create split rule', url: '/app/splitrules/new'}}
			secondaryAction={{
				content: 'Contact support',
				url: 'https://help.shopify.com',
			}}
			image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
		>
			<p>Track and receive your incoming inventory from suppliers.</p>
		</EmptyState>	
	</Card>
	);
}

export default EmptySplitRules;