import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import { getConversations } from "../../../../../app/slices/conversation";

import useResponsive from "../../../../../hooks/useResponsive";

import User from "./User";

const OnlineUsers = () => {
  const conversations = useSelector(getConversations);

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
        {conversations
          .filter((item) => item.status === "Online")
          .map((item, index) => (
            <SwiperSlide
              key={`${item._id}_${Math.floor(Math.random() * 1000)}${index}`}
            >
              <User id={item._id} name={item.name} avatar={item.avatar} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Stack>
  );
};

export default OnlineUsers;
