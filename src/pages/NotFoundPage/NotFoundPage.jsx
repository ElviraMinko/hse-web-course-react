import { Button } from '../../components/Button/Button';
import { AppLayout } from '../../components/Layout/AppLayout';
import { PageHeader, PageHeading, PageSubtitle, PageTitle } from '../../components/PageHeader/PageHeader';
import { Panel } from '../../components/Panel/Panel';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <AppLayout>
      <PageHeader>
        <PageHeading>
          <PageSubtitle>Ошибка 404</PageSubtitle>
          <PageTitle>Страница не найдена</PageTitle>
        </PageHeading>
      </PageHeader>
      <Panel className={styles.panel}>
        <p className={styles.text}>Возможно, задача была удалена или ссылка устарела.</p>
        <Button variant="primary" to="/">Вернуться к доске</Button>
      </Panel>
    </AppLayout>
  );
}
