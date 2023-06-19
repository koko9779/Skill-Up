package hellojpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class JpaMain {
    public static void main(String[] args) {
        // 1. META-INF/Persistence.xml 에서 설정 정보를 조회해서 EntityManagerFactory를 생성 한다.
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello"); //<persistence-unit name="hello"> 때문에 hello로 설정
        // 2. EntityManagerFactory에서 EntityManager를 생성 한다.
        EntityManager em = emf.createEntityManager();

        // 3. 트렌젝션
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        try {
            /**
            회원 등록

            Member member = new Member();
            member.setId(2L);
            member.setUsername("HelloB");

            em.persist(member); // member 저장 (1차 캐시에 저장됨)
            */

            /**
            회원 조회
            Member findMember = em.find(Member.class, 1L);  // 1차 캐시에서 조회 (DB 조회 안함)
            Member findMember2 = em.find(Member.class, 1L);

            System.out.println("findMember.id = " + findMember.getId());
            System.out.println("findMember.name = " + findMember.getName());

            System.out.println(findMember == findMember2); // true. 영속 엔티티 동일성 보장

            */

            /**
            회원 삭제
            Member findMember = em.find(Member.class, 1L);
            em.remove(findMember);
            */

            /**
            회원 수정
            Member findMember = em.find(Member.class, 1L);
            findMember.setName("HelloJPA");
            // JPA는 커밋하기 전에 변경내용을 한번 확인하기 때문에 저장이 따로 필요없다. (변경 감지 기능 있음)
            // 즉, update 쿼리 이후에 em.update(member); 나 em.persist(member); 같은게 필요없다
             */

            /**
            JPQL 이란
            -JPA를 사용하면 엔티티 객체를 중심으로 개발
            -문제는 검색 쿼리
            -검색을 할 때도 테이블이 아닌 엔티티 객체를 대상으로 검색
            -모든 DB 데이터를 객체로 변환해서 검색하는 것은 불가능
            -애플리케이션이 필요한 데이터만 DB에서 불러오려면 결국 검색 조건이 포함된 SQL이 필요
            -객체 지향 SQL

            List<Member> result = em.createQuery("select m from Member as m", Member.class)
                    .setFirstResult(5)
                    .setMaxResults(8)
                    .getResultList();

            for (Member member : result) {
                System.out.println("member.name = " + member.getName());
            }
            */

            /**
             * 플러시 발생
             * : 변경 감지,
             *   수정된 엔티티 쓰기 지연 SQL 저장소에 등록,
             *   쓰기 지연 SQL 저장소의 쿼리를 데이터 베이스에 전송 (등록,수정,삭제 쿼리)
             * ->영속성 컨텍스트의 변경 내용을 DB에 동기화 시키는 기능
             *
             * 1.em.flush(); -> 직접 호출
             * 2.트랜잭션 커밋 -> 플러시 자동 호출
             * 2.JPQL 쿼리 실행시 -> 플러시가 자동 호출
             */

            /**
             * 준영속 상태
             *
             * 1 Member findMember = em.find(Member.class, 1L);
             * 2 findMember.setName("HelloJPA");
             * 3-1 em.detach(member);
             * 3-2 em.clear();
             * 3-3 em.close();
             * 4 tx.commit();
             *
             * detach : 4에서 커밋을 해도 2에서 업데이트한 내용의 영속성 컨텍스트는 반영되지 않는다.
             * clear  : 영속성 컨텍스트가 통으로 날라간다. (1차캐시가 완전히 날라간다)
             * close  : 영속성 컨텍스트 종료
             */

            /**
            시퀀스 allocation=50일 때
            Member member1 = new Member();
            member1.setName("A");

            Member member2 = new Member();
            member2.setName("B");

            Member member3 = new Member();
            member3.setName("C");
                                    //allocation : 50일 경우..
            em.persist(member1);    //DB SEQ = 1, 51
            em.persist(member2);    //MEMOREY 호출
            em.persist(member3);    //MEMOREY 호출
            */

            //연관관계 매핑
            Team team = new Team();
            team.setName("TeamA");
            //team.getMembers().add(member); -> 역방향(가짜매핑)
            em.persist(team);

            Member member = new Member();
            member.setUsername("member1");
            member.changeTeam(team);
            em.persist(member);

            //테스트할 때, 영속성 컨텍스트 말고 DB에서 가져오는 걸 보고 싶으면 아래 두개를 한다.
            em.flush(); //영속성 컨텍스트에 남아있는 거를 DB에 쿼리를 다 날리는 것
            em.clear(); //영속성 컨텍스트 초기화

            Team findTeam = em.find(Team.class, team.getId());
            List<Member> members = findTeam.getMembers();

            //Member findMember = em.find(Member.class, member.getId());
            //List<Member> members = findMember.getTeam().getMembers();
            System.out.println("findTeam = " + findTeam);

            // 트랜젝션을 커밋하는 순간에 INSERT SQL을 보낸다.
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
        } finally {
            // 마무리작업으로 EntityManager를 닫아야 한다.
            em.close();
        }
        // 마무리작업으로 EntityManagerFactory를 닫아야 한다.
        emf.close();
    }
}
