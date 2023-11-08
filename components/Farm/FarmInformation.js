import { Div, Text } from 'react-native-magnus';
import ListItem from '../ui/ListItem';

const FarmInformation = ({ farm }) => {
  const {
    contactName,
    contactNumber,
    farmName,
    postcode,
    products,
    region,
    comments,
    accessCodes,
  } = farm;

  return (
    <>
      <Div
        m="lg"
        p={10}
        bg="white"
        shadow="sm"
        rounded="lg"
        testID="farm-info-card"
      >
        <Text fontWeight="bold" fontSize="4xl" mt="md" mb="lg" color="gray900">
          Farm Information
        </Text>
        <ListItem
          icon="tractor-variant"
          label="Farm Name"
          iconLibrary="MaterialCommunityIcons"
        >
          {farmName}
        </ListItem>
        <ListItem
          icon="address-card-o"
          label="Postcode"
          iconLibrary="FontAwesome"
        >
          {postcode}
        </ListItem>
        <ListItem icon="user" label="Contact Name" iconLibrary="Feather">
          {contactName}
        </ListItem>
        <ListItem
          icon="phone"
          label="Contact Number"
          iconLibrary="Feather"
          bottomBorder={!!region}
        >
          {contactNumber}
        </ListItem>
        {region && (
          <ListItem
            icon="location-outline"
            label="Region"
            iconLibrary="Ionicons"
            bottomBorder={false}
          >
            {region.regionName}
          </ListItem>
        )}
      </Div>
      {(accessCodes || comments) && (
        <Div
          m="lg"
          p={10}
          bg="white"
          shadow="sm"
          rounded="lg"
          testID="other-information-card"
        >
          <Text
            fontWeight="bold"
            fontSize="4xl"
            mt="md"
            mb="lg"
            color="gray900"
          >
            Other Information
          </Text>
          {accessCodes && (
            <ListItem
              icon="unlock"
              label="Access Codes"
              iconLibrary="Feather"
              bottomBorder={!!comments}
            >
              {accessCodes}
            </ListItem>
          )}

          {comments && (
            <ListItem
              icon="comment-text-outline"
              label="Comments"
              iconLibrary="MaterialCommunityIcons"
              bottomBorder={false}
            >
              {comments}
            </ListItem>
          )}
        </Div>
      )}
      <Div
        m="lg"
        p={10}
        bg="white"
        shadow="sm"
        rounded="lg"
        testID="products-card"
      >
        <Text fontWeight="bold" fontSize="4xl" mt="md" mb="lg" color="gray900">
          Products
        </Text>
        <>
          {products.map((product, index) => (
            <ListItem
              icon="flask-outline"
              label={`Product ${index + 1}`}
              iconLibrary="Ionicons"
              key={product.productName}
              bottomBorder={index !== products.length - 1}
            >
              {product.productName}
            </ListItem>
          ))}
        </>
      </Div>
    </>
  );
};

export default FarmInformation;
