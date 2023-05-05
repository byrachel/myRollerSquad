import React from "react";
import { useRouter } from "next/router";
import { Table, Row, User, Text, Badge } from "@nextui-org/react";
import { PostInterface } from "src/interfaces/flowInterfaces";
import { getStyleName } from "src/constants/RollerSkateStyles";
import { getCategoryName } from "src/constants/PostCategories";
import { deletePost } from "src/features/Flow/addPost/utils/deletePost";
import Trash from "src/svg/trash.svg";
import Heart from "src/svg/heart.svg";
import Comment from "src/svg/chat-bubble.svg";
import Arrow from "src/svg/nav-arrow-right.svg";

interface Props {
  posts: PostInterface[];
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostsTable({ posts, setUpdate }: Props) {
  const router = useRouter();

  const columns = [
    { name: "TITRE", uid: "title" },
    { name: "STYLE", uid: "category" },
    { name: "SUCCES", uid: "success" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (post: any, columnKey: any) => {
    const cellValue = post[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <User
            squared
            src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${post.pictures[0]}`}
            name={cellValue}
            css={{ p: 0, fontWeight: 500 }}
          >
            {getCategoryName(post.category_id)}
          </User>
        );
      case "category":
        return (
          <Row>
            {post.style.length > 0
              ? post.style.map((style: any, index: number) => (
                  <Badge key={index} variant="flat">
                    {getStyleName(style.style_id)}
                  </Badge>
                ))
              : null}
          </Row>
        );
      case "success":
        return (
          <Row justify="center" align="center">
            <Heart width={20} height={20} fill="#e4287d" />
            <Text
              b
              size={14}
              css={{
                tt: "capitalize",
                color: "$accents7",
                marginLeft: 3,
                marginRight: 10,
              }}
            >
              {post.user_likes.length}
            </Text>

            <Comment width={20} height={20} fill="none" stroke="black" />
            <Text
              b
              size={14}
              css={{ tt: "capitalize", color: "$accents7", marginLeft: 3 }}
            >
              {post.comments.length}
            </Text>
          </Row>
        );
      case "actions":
        return (
          <Row justify="center" align="center">
            <Trash
              width={20}
              height={20}
              fill="none"
              stroke="grey"
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() =>
                deletePost(post.id, () => setUpdate((prevState) => !prevState))
              }
            />
            <Arrow
              width={30}
              height={30}
              fill="none"
              stroke="grey"
              role="button"
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => router.push(`/post/${post.id}`)}
            />
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions" || column.uid === "success"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={posts}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
