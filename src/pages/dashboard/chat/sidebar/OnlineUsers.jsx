import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Stack, Typography, Box, useTheme, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import {
  getChatConversations,
  startChatConversation,
} from "../../../../app/slices/chat_conversation";
import createAvatar from "../../../../utils/createAvatar";
import { selectConversation } from "../../../../app/slices/app";
import StyledBadge from "../../../../components/StyledBadge";

import useResponsive from "../../../../hooks/useResponsive";

const User = ({ user }) => {
  const avatar = createAvatar(user?.name);
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const handleSelectConversation = async () => {
    dispatch(selectConversation({ chat_type: "dividual", room_id: user?._id }));
    dispatch(startChatConversation(user?._id));
  };

  if (user)
    return (
      <Stack
        spacing={1}
        alignItems="center"
        sx={{
          cursor: "pointer",
          height: "fit-content",
        }}
        onClick={handleSelectConversation}
      >
        <Box
          sx={{
            pt: 0.7,
            marginBottom: "-28px !important",
            "& .MuiBadge-badge": {
              width: "6px",
              height: "6px",
              minWidth: "3px",
              boxShadow: "0 0 0 1px #fff",
            },
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={user.avatar}
              alt={`${user?.name} avatar`}
              sx={{
                width: "40px",
                height: "40px",
              }}
            >
              {avatar?.name}
            </Avatar>
          </StyledBadge>
        </Box>
        <Box
          px={1.5}
          py={1}
          pt={3.3}
          sx={{
            backgroundColor:
              mode === "light"
                ? alpha(theme.palette.grey[300], 0.5)
                : alpha(theme.palette.grey[700], 0.5),
            borderRadius: 1.5,
            width: "90px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              color: mode === "light" ? "grey.800" : "grey.100",
              textTransform: "capitalize",
              userSelect: "none",
            }}
            title={user?.name}
          >
            {user?.name.split(" ")[0]}
          </Typography>
        </Box>
      </Stack>
    );
};

const OnlineUsers = () => {
  const conversations = useSelector(getChatConversations);
  const onlineConvs = conversations.filter((item) => item.status === "Online");

  const upMdSize = useResponsive("up", "md");
  const upLgSize = useResponsive("up", "lg");

  return (
    <Stack
      width="100%"
      sx={{
        "& .swiper-wrapper": {
          display: "flex",
          flexDirection: "row",
        },
      }}
    >
      <Swiper
        slidesPerView={upLgSize ? 3.6 : upMdSize ? 3.35 : 3.1}
        slidesOffsetBefore={upLgSize ? 18 : upMdSize ? 20 : 17}
        slidesOffsetAfter={upLgSize ? 18 : upMdSize ? 20 : 17}
        freeMode={true}
        modules={[FreeMode]}
        style={{ width: "100%" }}
      >
        {onlineConvs.map((item, index) => (
          <SwiperSlide
            key={`${item._id}_${Math.floor(Math.random() * 1000)}${index}`}
          >
            <User user={item} isLast={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default memo(OnlineUsers);
