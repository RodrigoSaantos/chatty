import { http } from "./http";
import './websockets/client';
import './websockets/admin';

http.listen(3333, () => {
  console.log('🚀 App listening on port http://localhost:3333');
});