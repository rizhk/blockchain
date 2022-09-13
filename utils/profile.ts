/* eslint-disable no-restricted-properties */
export const nameInitials = (user: { full_name: string }) => {
  let displayName = user?.full_name.split(' ');

  if (displayName.length > 1) {
    return (displayName[0].slice(0, 1) + displayName[1].slice(0, 1)) as string;
  } else {
    return displayName.slice(0, 2);
  }
};
