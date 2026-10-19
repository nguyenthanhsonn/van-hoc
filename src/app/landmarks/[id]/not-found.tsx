import Link from 'next/link';
import styles from './LandmarkStory.module.css';

export default function LandmarkNotFound() {
  return <main className={styles.notFound}>
    <span aria-hidden="true">✦</span>
    <h1>Không tìm thấy điểm mốc này</h1>
    <p>Có thể đường dẫn đã thay đổi. Em hãy trở về bản đồ để chọn một điểm mốc và tiếp tục hành trình.</p>
    <Link href="/">← Về bản đồ</Link>
  </main>;
}
