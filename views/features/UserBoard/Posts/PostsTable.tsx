import React from "react";
import { Table, Row, User, Text, Badge, Col } from "@nextui-org/react";

import { PostInterface } from "models/entities/flow.entity";
import { getStyleName } from "views/constants/RollerSkateStyles";
import { getCategoryName } from "views/constants/PostCategories";
import { deletePost } from "views/features/Flow/addPost/utils/deletePost";
import { cardColor } from "views/utils/colorManager";
import UpdateDeleteIcons from "views/components/buttons/UpdateDeleteIcons";

import Heart from "views/svg/heart.svg";
import Comment from "views/svg/chat-bubble.svg";

interface Props {
  posts: PostInterface[];
  userId: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setEditPost: React.Dispatch<
    React.SetStateAction<{ show: boolean; post: PostInterface | null }>
  >;
}

export default function PostsTable({
  posts,
  userId,
  setUpdate,
  setEditPost,
}: Props) {
  const columns = [
    { name: "TITRE", uid: "title" },
    { name: "CATEGORIE", uid: "category" },
    { name: "REACTIONS", uid: "success" },
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
            {post.place_id ? `Business Post` : null}
          </User>
        );
      case "category":
        return (
          <Col>
            <Row>
              <div
                className={`staticOutlineBadge ${cardColor(post.category_id)}`}
              >
                {getCategoryName(post.category_id)}
              </div>
            </Row>
            <Row justify="flex-start" align="center" wrap="wrap">
              {post.style.length > 0
                ? post.style.map((style: any, index: number) => (
                    <Badge key={index} variant="flat">
                      {getStyleName(style.style_id)}
                    </Badge>
                  ))
                : null}
            </Row>
          </Col>
        );
      case "success":
        return (
          <Row justify="flex-start" align="center">
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
          <Row align="flex-end">
            <UpdateDeleteIcons
              onUpdate={() => setEditPost({ show: true, post })}
              onDelete={() =>
                deletePost(userId, post.id, () =>
                  setUpdate((prevState) => !prevState)
                )
              }
            />
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Tableau listant toutes tes publications"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      lined
      selectionMode="none"
      shadow={false}
      sticked
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
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
