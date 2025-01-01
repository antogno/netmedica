import { DataListItem, DataListRoot } from '@/components/ui/data-list';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { API_BASE_URL, Project } from '@/services/api';
import { Badge, Box, Card, HStack, Image, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuExternalLink } from 'react-icons/lu';

interface Props {
  project: Project;
}

function ProjectCard(props: Props) {
  const [open, setOpen] = useState(false);

  const getPerformanceColor = (performance: number) => {
    return performance < 33 ? 'red' : performance < 66 ? 'yellow' : 'green';
  };

  function ProjectImage(p: { rounded?: boolean }) {
    return (
      <Image
        src={`${API_BASE_URL}/${props.project.img}`}
        rounded={p.rounded ? 'md' : undefined}
        alt={props.project.img}
      />
    );
  }

  function ProjectPerformanceBadge() {
    return (
      <Badge colorPalette={getPerformanceColor(props.project.performance)}>
        {props.project.performance}%
      </Badge>
    );
  }

  return (
    <>
      <DialogRoot
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        modal
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.project.progetto}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <DataListRoot orientation="horizontal">
              <DataListItem label="ID" value={props.project.id} />
              <DataListItem label="Progetto" value={props.project.progetto} />
              <DataListItem
                label="Performance"
                value={<ProjectPerformanceBadge />}
              />
              <DataListItem
                label="Immagine"
                value={
                  <Link
                    variant="underline"
                    href={`${API_BASE_URL}/${props.project.img}`}
                    target="_blank"
                  >
                    {props.project.img}
                    <LuExternalLink />
                  </Link>
                }
              />
            </DataListRoot>
            <Box mt="8">
              <ProjectImage rounded />
            </Box>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Card.Root
        maxW="xs"
        overflow="hidden"
        cursor="pointer"
        borderColor={`${getPerformanceColor(props.project.performance)}/30`}
        onClick={() => setOpen((e) => !e)}
      >
        <ProjectImage />
        <Card.Body gap="2">
          <Card.Title>{props.project.progetto}</Card.Title>
          <Card.Description>
            <HStack>
              <Text fontWeight="medium" letterSpacing="tight">
                Performance
              </Text>
              <ProjectPerformanceBadge />
            </HStack>
          </Card.Description>
        </Card.Body>
      </Card.Root>
    </>
  );
}

export default ProjectCard;
