import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Cog as CogIcon } from "../icons/cog";
import { DocumentText as DocumentTextIcon } from "../icons/document-text";
import { Home, Book, Category } from "@material-ui/icons";
import { Star as StarIcon } from "../icons/star";
import { User as UserIcon } from "../icons/user";

const items = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Home",
  },
  {
    href: "/dashboard/settings",
    icon: Book,
    label: "Book",
  },
  {
    href: "/dashboard/theme",
    icon: Category,
    label: "Category",
  },
  {
    href: "/dashboard/icons",
    icon: StarIcon,
    label: "Icons",
  },
  {
    href: "/404",
    icon: UserIcon,
    label: "404",
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 64px)",
          p: 1,
          top: 64,
          width: 73,
        },
      }}
    >
      <List sx={{ width: "100%" }}>
        {items.map(({ href, icon: Icon, label }) => {
          const active = matchPath(
            { path: href, end: true },
            location.pathname
          );

          return (
            <ListItem
              disablePadding
              component={RouterLink}
              key={href}
              to={href}
              sx={{
                flexDirection: "column",
                color: active ? "primary.main" : "text.secondary",
                px: 2,
                py: 1.5,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  color: "inherit",
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    pb: 0,
                    pt: 1.25,
                  },
                  variant: "caption",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
