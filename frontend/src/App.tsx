import { ProgressBar } from './components/ui/progress';
import ProjectCard from '@/components/ProjectCard';
import { Alert } from '@/components/ui/alert';
import Api, { Project } from '@/services/api';
import { Flex, ProgressRoot } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchFailed, setHasFetchFailed] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    Api.getProjects()
      .then((data) => {
        if (data.status === 'success') {
          setProjects(data.data);
        } else {
          setHasFetchFailed(true);
        }
      })
      .catch(() => setHasFetchFailed(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <ProgressRoot mt="8" value={null}>
        <ProgressBar />
      </ProgressRoot>
    );
  }

  if (hasFetchFailed) {
    return (
      <Alert
        mt="8"
        size="lg"
        status="error"
        title="Si è verificato un errore durante l'elaborazione della tua richiesta."
      />
    );
  }

  if (!projects.length) {
    return (
      <Alert
        mt="8"
        size="lg"
        status="info"
        title="Nessun progetto da visualizzare."
      />
    );
  }

  return (
    <Flex gap="8" pt="8" direction="row" wrap="wrap">
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </Flex>
  );
}

export default App;
