'use client';

import { Modal } from '@lobehub/ui';
import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchTopics } from '@/hooks/useFetchTopics';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

import { useWorkspaceModal } from '../../features/useWorkspaceModal';

const Topics = memo(({ children }: PropsWithChildren) => {
  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    systemStatusSelectors.mobileShowTopic(s),
    s.toggleMobileTopic,
  ]);
  const [open, setOpen] = useWorkspaceModal(showAgentSettings, toggleConfig);
  const { t } = useTranslation('topic');

  useFetchTopics();

  return (
    <Modal
      allowFullscreen
      onCancel={() => setOpen(false)}
      open={open}
      styles={{
        body: { padding: 0 },
      }}
      title={t('title')}
    >
      {children}
    </Modal>
  );
});

export default Topics;
