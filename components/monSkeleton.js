import { Skeleton } from '@mantine/core';

const MonSkeleton = () => {
  return (
    <div>
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} mt={6} width="90%" radius="xl" />
      <Skeleton height={8} mt={6} width="90%" radius="xl" />
      <Skeleton height={8} mt={6} width="90%" radius="xl" />
      <Skeleton height={8} mt={6} width="80%" radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
      Contenu bientôt disponible...
    </div>
  )
}

export default MonSkeleton;