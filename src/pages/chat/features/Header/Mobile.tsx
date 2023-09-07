import { ActionIcon, MobileNavBar, MobileNavBarTitle } from '@lobehub/ui';
import { LayoutList, Settings } from 'lucide-react';
import Router from 'next/router';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';
import { agentSelectors, sessionSelectors } from '@/store/session/selectors';

const MobileHeader = memo(() => {
  const { t } = useTranslation('common');

  const [id, isInbox, title, model] = useSessionStore((s) => [
    s.activeId,
    sessionSelectors.isInboxSession(s),
    agentSelectors.currentAgentTitle(s),
    agentSelectors.currentAgentModel(s),
  ]);

  const [toggleConfig] = useGlobalStore((s) => [s.toggleMobileTopic]);

  const displayTitle = isInbox ? t('inbox.title') : title;

  return (
    <MobileNavBar
      center={<MobileNavBarTitle desc={model} title={displayTitle} />}
      onBackClick={() => Router.back()}
      right={
        <>
          <ActionIcon icon={LayoutList} onClick={() => toggleConfig()} />
          {!isInbox && (
            <ActionIcon
              icon={Settings}
              onClick={() => {
                Router.push(`/chat/${id}/setting`);
              }}
            />
          )}
        </>
      }
      showBackButton
    />
  );
});

export default MobileHeader;
