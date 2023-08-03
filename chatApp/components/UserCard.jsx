import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function UserCard({ onClick, username, lastMessage, userId }) {
  return (
    <div className="flex justify-center" style={{ margin: "10px" }}>
      <Card className="mt-6 mb-4" style={{ width: "10rem" }}>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            @{username}
          </Typography>
          {/* <Typography>{lastMessage}</Typography> */}
        </CardBody>
        <CardFooter className="pt-0 flex justify-center">
          <Button id={userId} onClick={onClick}>
            Chat
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
