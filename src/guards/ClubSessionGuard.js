import PropTypes from 'prop-types';
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import { useEffect, useState } from 'react';
import { showClub } from '../api/club';
import { showClubSession } from '../api/club_session';
import { showTeacherByUserId } from '../api/teacher';

// ----------------------------------------------------------------------

ClubSessionGuard.propTypes = {
  children: PropTypes.node,
};

export default function ClubSessionGuard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { club_code, session_code } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchInfo() {
      try {
        const clubRes = await showClub(club_code);
        const sessionRes = await showClubSession(session_code);
        const club = clubRes.data;
        const session = sessionRes.data;
        if (session?.schedule?.club?.club_code !== club?.club_code) {

          navigate('/404');
        }
        if (user?.role === 3) {
          const teacher = showTeacherByUserId(user?.user_id);
          if (teacher?.teacher_code !== club?.teacher?.teacher_code
            && teacher?.teacher_code !== session?.schedule?.teacher?.teacher_code) {
            navigate('/404');
          }
        }
        setLoading(true)
      } catch (e) {
        console.error(e);
      }
    }

    fetchInfo();
  }, []);

  return <>
    {loading && <Outlet />}
  </>;
}
